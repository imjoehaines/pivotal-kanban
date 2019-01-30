export default (err: Error) => {
    console.error(err)

    alert(`Oops! Something broke... ${err.message}`)

    return err
}
