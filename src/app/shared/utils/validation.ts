export class ValidatorsUtil {

  static validateCPF(cpf: string): boolean {
    if (!cpf) return false;

    const clean = cpf.replace(/\D/g, '');

    return /^\d{11}$/.test(clean);
  }

  static validateCEP(cep: string): boolean {
    if (!cep) return false;

    const clean = cep.replace(/\D/g, '');

    return /^\d{8}$/.test(clean);
  }

  static validateEmail(email: string): boolean {
    if (!email) return false;

    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  static cleanName(name: string): string {
  if (!name) return '';

  return name
    .trim() // remove espaços do começo e fim
    .replace(/\s{2,}/g, ' ') // remove espaços duplicados
    .replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); // remove caracteres inválidos
}


static formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}


static validateDate(date: string): boolean {
  if (!date) return false;

  const dataNascimento = new Date(date);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (isNaN(dataNascimento.getTime())) return false;

  return dataNascimento <= hoje;
}
}
