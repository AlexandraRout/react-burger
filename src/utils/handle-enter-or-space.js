const handleEnterOrSpace = (callback) => (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    callback();
  }
};

export default handleEnterOrSpace;
