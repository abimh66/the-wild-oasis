import supabase, { supabaseUrl } from './supabase.js';

async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Could not get cabin data');
  }

  return data;
}

async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Insert new cabin to database
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  // 2. Upload cabin image to storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. If the upload image failed
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export { getCabins, deleteCabin, createCabin };
