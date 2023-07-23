export default function makeEnumerableCopy(err) {
    let descriptor = Object.getOwnPropertyDescriptors(err);
    // set all properties in the descriptor to be enumerable
    for (let key of Object.keys(descriptor)) {
        descriptor[key].enumerable = true;
    }
    return Object.defineProperties({}, descriptor);
}