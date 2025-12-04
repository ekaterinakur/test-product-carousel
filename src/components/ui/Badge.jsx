const Badge = ({ children, variant = 'danger', className = '' }) => {
  const variants = {
    danger: 'bg-red-500 text-white',
  };

  const baseStyles = 'text-xs font-bold rounded-full flex items-center justify-center';
  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;
