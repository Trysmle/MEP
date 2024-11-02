import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface TabsContentProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === TabsTrigger) {
        return React.cloneElement(child, {
          onClick: () => onValueChange(child.props.value)
        });
      }
      if (child.type === TabsContent) {
        return React.cloneElement(child, {
          activeValue: value
        });
      }
    }
    return child;
  });

  return (
    <div className="w-full">
      {childrenWithProps}
    </div>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div role="tablist" className={`inline-flex p-1 bg-gray-100 rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, onClick }: TabsTriggerProps) {
  return (
    <button
      role="tab"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
        ${onClick ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeValue, children, className = '' }: TabsContentProps) {
  if (value !== activeValue) return null;
  
  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}