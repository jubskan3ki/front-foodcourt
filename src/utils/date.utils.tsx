import { formatDistanceToNow, parseISO } from 'date-fns';

export function formatDateToRelative(dateString: string) {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
}
