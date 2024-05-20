async function getResults() {
    const players = ['Tina', 'Jorge', 'Julien'];
    
    for (const player of players) {
      try {
        const result = await luckyDraw(player);
        console.log(result);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
  
  // Call the getResults function
  getResults();