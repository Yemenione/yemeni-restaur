import { usePage } from '@inertiajs/react';

type Translations = Record<string, any>;

export function useTranslations(namespace: string) {
    const { translations } = usePage<{ translations: Translations }>().props;

    return (key: string, _replacements?: Record<string, string | number>) => {
        // Handle namespace.key logic
        const keys = `${namespace}.${key}`.split('.');
        let result: any = translations;

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return key; // Fallback to key if not found
            }
        }

        return typeof result === 'string' ? result : key;
    };
}

export function useLocale() {
    const { locale } = usePage<{ locale: string }>().props;
    return locale || 'en';
}
