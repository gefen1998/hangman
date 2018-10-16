# error - Encountered two children with the same key

* solution.jsx :

    generateLetterTags() {
        return this.state.word.split("").map(l => {
            return (<Letter key={l} letter={l} />)
        })
    }

* Letters.jsx :

  generateLetterTags(letterStatus) {
    return Object.keys(letterStatus).map(l => {
      return (<Letter key={l} letter={l} />)
    })
  }

# don't understand when to use props and how exactly.
# what's rendering where- go over the video!
# importance of adding ** key={}