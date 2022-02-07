export interface IUsuario {
  name: string;
  avatar_url: string;
}
export class UsuarioDTO implements IUsuario {
  name = "";
  avatar_url = "";
}

export default class Usuario extends UsuarioDTO {
  constructor(dto: UsuarioDTO) {
    super();
    (this.name = dto.name), (this.avatar_url = dto.avatar_url);
  }

  get nomeDoUsuario(): string {
    return `${this.name}`;
  }
}
