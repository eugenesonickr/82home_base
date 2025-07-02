import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type: 'card' | 'text' | 'image' | 'list' | 'post';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1, className = '' }) => {
  const shimmer = {
    initial: { backgroundPosition: '-200px 0' },
    animate: { backgroundPosition: '200px 0' },
  };

  const SkeletonCard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}
    >
      <motion.div
        variants={shimmer}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg mb-4"
        style={{
          backgroundSize: '400px 100%',
        }}
      />
      <div className="space-y-3">
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
          className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4"
          style={{ backgroundSize: '400px 100%' }}
        />
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full"
          style={{ backgroundSize: '400px 100%' }}
        />
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-2/3"
          style={{ backgroundSize: '400px 100%' }}
        />
      </div>
    </motion.div>
  );

  const SkeletonText = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`space-y-2 ${className}`}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
          className={`h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded ${
            i === 0 ? 'w-full' : i === 1 ? 'w-5/6' : 'w-3/4'
          }`}
          style={{ backgroundSize: '400px 100%' }}
        />
      ))}
    </motion.div>
  );

  const SkeletonImage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      variants={shimmer}
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg ${className}`}
      style={{ backgroundSize: '400px 100%' }}
    />
  );

  const SkeletonList = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`space-y-4 ${className}`}
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
            className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full"
            style={{ backgroundSize: '400px 100%' }}
          />
          <div className="flex-1 space-y-2">
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.1 + 0.1 }}
              className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4"
              style={{ backgroundSize: '400px 100%' }}
            />
            <motion.div
              variants={shimmer}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.1 + 0.2 }}
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-1/2"
              style={{ backgroundSize: '400px 100%' }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );

  const SkeletonPost = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      <motion.div
        variants={shimmer}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
        style={{ backgroundSize: '400px 100%' }}
      />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
            className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-20"
            style={{ backgroundSize: '400px 100%' }}
          />
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-24"
            style={{ backgroundSize: '400px 100%' }}
          />
        </div>
        <motion.div
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
          className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-4/5"
          style={{ backgroundSize: '400px 100%' }}
        />
        <div className="space-y-2">
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-full"
            style={{ backgroundSize: '400px 100%' }}
          />
          <motion.div
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4"
            style={{ backgroundSize: '400px 100%' }}
          />
        </div>
      </div>
    </motion.div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <SkeletonCard />;
      case 'text':
        return <SkeletonText />;
      case 'image':
        return <SkeletonImage />;
      case 'list':
        return <SkeletonList />;
      case 'post':
        return <SkeletonPost />;
      default:
        return <SkeletonCard />;
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;