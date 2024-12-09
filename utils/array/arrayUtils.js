export default class {
    constructor(array) {
        this.array = array
    }
    
    async betweenIncludes(target, callback) {
        let stack = new Array()
        await this.array.forEach(async element => {
            await target.includes(element) ? stack.push(true) : stack.push(false)
        })
        stack.some(element => element === false) ? callback(false) : callback(true)
    }
}