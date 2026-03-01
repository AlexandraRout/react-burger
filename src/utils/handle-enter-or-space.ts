import { KeyboardEvent } from 'react';

const handleEnterOrSpace = (callback: () => void) => (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    callback();
  }
};

export default handleEnterOrSpace;
