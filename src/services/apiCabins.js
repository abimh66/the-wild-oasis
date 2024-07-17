import supabase from './supabase.js';

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Could not get cabin data');
  }

  return data;
}

export { getCabins };
