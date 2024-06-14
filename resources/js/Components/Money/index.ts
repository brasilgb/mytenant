export const MoneyptBR = (value: any) => {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}

export const ValuePercent = (value:any) => {
    return `${parseFloat(value).toFixed(2)}%`;
}