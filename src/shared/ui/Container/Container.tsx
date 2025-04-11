// src/shared/ui/Container/index.tsx
import React from 'react';
import styles from './styles.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
