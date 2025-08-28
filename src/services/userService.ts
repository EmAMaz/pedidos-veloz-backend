class UserService {
  private users: { email: string; password: string }[] = [];

  async createUser(email: string, password: string): Promise<void> {
    // Simular la validación de que el email no esté ya registrado
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // Simular el hasheo de la contraseña (en un entorno real, usarías bcrypt)
    const hashedPassword = `hashed_${password}`;

    // Simular la creación del usuario en la "base de datos"
    this.users.push({ email, password: hashedPassword });
  }
}

export default new UserService();
