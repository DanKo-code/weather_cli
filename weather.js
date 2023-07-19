#!/user/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js'
import { getWeather } from './services/api.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('void token!')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token was save')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('void city!')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City was save')
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICTIONARY.city)
        if (!city) {
            throw new Error('City is void, set it with -c [CITY_NAME]')
        }

        const weather = await getWeather(city)
        printWeather(weather)
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('City not exists')
        } else if (error?.response?.status == 401) {
            printError('Token not exists')
        } else {
            printError(error.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)

    if (args.h) {
        printHelp();
    }
    if (args.c) {
        return saveCity(args.c)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    getForcast()
}

initCLI()