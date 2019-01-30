export default (response: Response) => {
    if (!response.ok) {
        console.error(response)

        throw new Error(response.statusText)
    }

    return response
}
