const scrollToElement = (
  container,
  target,
  behavior = 'smooth',
) => {
  if (!container || !target) return;

  const containerTop = container.getBoundingClientRect().top;
  const targetTop = target.getBoundingClientRect().top;

  const offset = targetTop - containerTop + container.scrollTop;

  container.scrollTo({
    top: offset,
    behavior,
  });
};

export default scrollToElement;
