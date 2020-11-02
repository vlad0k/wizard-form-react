const getFileExtentionFromMime = (mime: string) => (mime ? mime.split('/')[1] : '');

export default getFileExtentionFromMime;
