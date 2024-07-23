import supabase from './supabase.js';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update fullName or Password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload image avatar to storage
  const fileName = `avatar-${data.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (uploadError) throw new Error(uploadError.message);

  // 3. Update avatar path
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://jzqavavyawddvtsltvti.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
