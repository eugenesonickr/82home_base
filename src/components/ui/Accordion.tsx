import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { keyboardHelpers } from '../../utils/accessibility';
import AccessibleButton from '../common/AccessibleButton';

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[];
  allowMultiple?: boolean;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  isOpen = false,
  onToggle
}) => {
  const handleToggle = () => {
    onToggle?.(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (keyboardHelpers.isEnterOrSpace(event)) {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <AccessibleButton
        onClick={handleToggle}
        variant="ghost"
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-none"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        ariaLabel={`${title} ${isOpen ? '접기' : '펼치기'}`}
      >
        <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </AccessibleButton>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`accordion-content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            role="region"
            aria-labelledby={`accordion-button-${id}`}
          >
            <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      
      return newSet;
    });
  };

  return (
    <div className={`space-y-2 ${className}`} role="region" aria-label="아코디언">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen: openItems.has(child.props.id),
            onToggle: handleToggle
          });
        }
        return child;
      })}
    </div>
  );
};

export default Accordion;