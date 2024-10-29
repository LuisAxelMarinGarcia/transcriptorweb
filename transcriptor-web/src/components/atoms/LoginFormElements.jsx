export const Button = ({ children, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
  
export const Input = ({ type, placeholder }) => (
    <input type={type} placeholder={placeholder} />
);
  
export const Label = ({ children }) => (
    <label>{children}</label>
);