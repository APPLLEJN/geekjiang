export default async function prepareFun(fn) {
  try {
    await fn();
  } catch (err) {
    console.log(err);
  }
}
//asyncPrint('hello world', 50);