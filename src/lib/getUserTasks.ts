export default async function (uid: string) {
  const res = await fetch(`/api/users/${uid}/tasks`);
  const data = await res.json();
  return data.tasks;
}
