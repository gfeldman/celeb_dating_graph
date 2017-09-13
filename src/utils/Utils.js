export async function getCelebs() {
    let requestURL ='http://localhost:7474/db/data/transaction/commit/'
    let options = () => {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("neo4j" + ":" + "1q2w3e$R")
        },
        body: JSON.stringify({
          statements: [{statement:
              "MATCH (n) RETURN n.id,n.name"
           }]
        })
      }
    }

    try{
      let request = await fetch(requestURL,options())
      let response = await request.json()
      let names = response.results[0]
                        .data
                        .map( function(e) {
                            return({ id: e.row[0], name: e.row[1]})
                          }))

       return names

    } catch (error){
      console.log(error)
      throw error
    }

}
