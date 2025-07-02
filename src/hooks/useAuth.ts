import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    // 현재 세션 확인
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const isAdmin = await checkAdminStatus(session.user.id);
        setAuthState({
          user: session.user,
          isAdmin,
          loading: false,
        });
      } else {
        setAuthState({
          user: null,
          isAdmin: false,
          loading: false,
        });
      }
    };

    getSession();

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const isAdmin = await checkAdminStatus(session.user.id);
          setAuthState({
            user: session.user,
            isAdmin,
            loading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAdmin: false,
            loading: false,
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('is_admin')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('관리자 상태 확인 오류:', error);
        return false;
      }

      return data?.is_admin || false;
    } catch (error) {
      console.error('관리자 상태 확인 중 오류:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
};