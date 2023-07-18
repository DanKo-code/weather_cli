#!/user/bin/env node
import { getArgs } from './helpers/args.js'

const initCLI = () => {
    const args = getArgs(process.argv)
    console.log(args)

    if (args.h) {
        //out help
    }
    if (args.s) {
        //save town
    }
    if (args.t) {
        //save token
    }
    //out weather
}

initCLI()