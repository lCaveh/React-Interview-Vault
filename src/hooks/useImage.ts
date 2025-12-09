import { useState, useEffect, useMemo } from 'react';

const BASE_URL = 'https://lcaveh.github.io/React-Interview-Vault';
const PLACEHOLDER_IMAGE = `${BASE_URL}/assets/placeholder.svg`;

const getImagePath = (path: string): string => {
    if (!path) return PLACEHOLDER_IMAGE;
    if (path.startsWith('http') || path.startsWith('data:')) {
        return path;
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_URL}${cleanPath}`;
};

interface UseImageResult {
    imageSrc: string;
    handleImageError: () => void;
}

export const useImage = (image: string): UseImageResult => {
    const computedImagePath = useMemo(() => getImagePath(image), [image]);
    const [imageSrc, setImageSrc] = useState(computedImagePath);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!hasError) {
            setImageSrc(getImagePath(image));
        }
    }, [image, hasError]);

    const handleImageError = (): void => {
        setHasError(true);
        setImageSrc(PLACEHOLDER_IMAGE);
    };

    return { imageSrc, handleImageError };
};

export { getImagePath, BASE_URL, PLACEHOLDER_IMAGE };
