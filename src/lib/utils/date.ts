export function getIndonesianMonth(monthNumber: number | string): string {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 
        'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];
    
    const index = Number(monthNumber) - 1;
    return months[index] || '';
}
