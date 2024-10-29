import { Button, Input, Label } from '../../atoms/LoginFormElements';

const LoginFormDocent = () => (
  <form className="login-form">
    <div>
      <Label>Usuario</Label>
      <Input type="text" placeholder="Usuario" />
    </div>
    <div>
      <Label>Contraseña</Label>
      <Input type="password" placeholder="Contraseña" />
    </div>
    <a href="#">¿Olvidaste tu contraseña?</a>
  </form>
);

export default LoginFormDocent;
