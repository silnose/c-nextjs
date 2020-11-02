const slug = (name = '') =>
  name
    .toLocaleLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default slug;
