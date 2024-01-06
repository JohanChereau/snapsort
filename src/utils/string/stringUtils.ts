export function capitalize(text: string): string {
    return text.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ');
}

export function truncateString(text: string, length: number, ellipse: string = '...'): string {
    return text.length >= length - ellipse.length ? text : text.slice(0, length - ellipse.length) + ellipse;
}