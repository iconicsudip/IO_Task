const user_time = 13

const time_earnings= [[5,1500],[4,1000],[10,3000]];

userMaxProfit(user_time,time_earnings)


// function of userMaxProfit to calculate and show profits

function userMaxProfit(user_time,time_earnings){
    let result = 0;
    let visited = [];
    for(let i=0;i<time_earnings.length;i++){
        let time_visited = new Array(3).fill(0)
        let curr_time = time_earnings[i][0]
        let curr_earning = time_earnings[i][1]
        let sum = 0;
        while(curr_time<=user_time){
            sum += (user_time - curr_time)*curr_earning
            curr_time += time_earnings[i][0];
        }
        if((sum===result || result===0) && sum!==0){
            time_visited[i] = Math.floor(user_time/time_earnings[i][0])
        }
        result = Math.max(result,sum);
        visited.push(time_visited)
    }
    console.log(`Time Unit: ${user_time}\nEarnings: $${result}`)
    console.log("Solutions: ")
    let count = 1;
    visited.forEach((elem)=>{
        if(elem[0]!==0 || elem[1]!==0 || elem[2]!==0){
            console.log(`   ${count}. T: ${elem[0]} P: ${elem[1]} C: ${elem[2]}`)
            count+=1;
        }
    })
}