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

async function createUpdateCabin(newCabin, id) {
  // 1. Check if newCabin data already have Image Path
  // if you updating cabin without change the image, newCabin data will contain string image path not image file
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 2. Insert new cabin to database
  let query = supabase.from('cabins');

  // A) CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) UPDATE CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  if (hasImagePath) return data;

  // 3. Upload cabin image to storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 4. If the upload image failed, delete the insert
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export { getCabins, deleteCabin, createUpdateCabin };
