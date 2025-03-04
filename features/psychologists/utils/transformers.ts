// Функція для правильного відмінювання слова "рік"
export function getYearsText(years: number): string {
    if (years === 1) return 'рік';
    if (years >= 2 && years <= 4) return 'роки';
    return 'років';
} 