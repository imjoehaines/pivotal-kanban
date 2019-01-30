export default (storage: Storage) => {
    let token = ''

    try {
        token = storage.getItem('pivotal-token') || ''
    } catch (err) {
        console.error('failed to fetch token from storage', err)
    }

    while (!token) {
        token = prompt('Please enter your Pivotal Tracker token', '') || ''
    }

    try {
        storage.setItem('pivotal-token', token)
    } catch (err) {
        console.error('failed to save token in storage', err)
    }

    return token
}
