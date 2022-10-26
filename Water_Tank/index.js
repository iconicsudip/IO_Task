var form = document.getElementById("inputform");
form.addEventListener("submit", calculate, true);



function calculate(e){
    e.preventDefault();
    let value = document.getElementById("input").value.split("");
    let finalvalue = [];
    var allow = true;
    for(var i=0;i<value.length;i++){
        if(value[i]!==" " && !Number.isInteger(parseInt(value[i]))){
            allow = false;
            alert("You can only enter number");
            document.getElementById("input").value = ""
        }
        if(value[i]!==" "){
            finalvalue.push(parseInt(value[i]))
        }
    }
    if(allow){
        generateResult(finalvalue)
    }
}


function generateResult(height){
    const left = new Array(height.length);
    const right = new Array(height.length);
    left.fill(0),right.fill(0)
    left[0] = height[0];
    let maxi = 0;
    for (var i=0;i<height.length;i++){
        maxi = Math.max(maxi,height[i]);
    }
    for(var i=1;i<height.length;i++){
        left[i] = Math.max(height[i],left[i-1])
    }
    right[right.length-1] = height[height.length-1]
    for(var i=height.length-2;i>=0;i--){
        right[i] = Math.max(height[i],right[i+1])
    }
    let ans=0,output = new Array(height.length);
    output.fill(0);
    for(var i=1;i<height.length-1;i++){
        const calc = Math.min(left[i],right[i]) - height[i]
        ans += calc;
        output[i] = calc
    }
    const row = maxi+1;
    const column = height.length;
    let inputMat = createInputMatrix(height,output,row,column)
    inputTable(height,row,column,inputMat)
    outputTable(ans,row,column,inputMat)
}
function createInputMatrix(input,output,row,col){
    var last = row - 1
    var matrix = [];
    for(var i=0; i<row; i++) {
        matrix.push(new Array(10).fill(0));
    }
    for(var i=0; i<col; i++) {
        var temp = parseInt(last)
        if(input[i]!==0){
            for(var j=0;j<input[i];j++){
                matrix[temp][i] = 1
                temp-=1
            }
        }
    }
    for(var i=0; i<col; i++) {
        var temp = parseInt(last)
        if(output[i]!==0){
            while(matrix[temp][i]===1){
                temp -=1
            }
            for(var j=0;j<output[i];j++){
                if(matrix[temp][i]!==1){
                    matrix[temp][i] = 2
                }
                temp-=1
            }
        }
    }
    return matrix
}
function outputTable(ans,row,col,inputMat){
    var tableString = `<table id="table">`;
    var body = document.getElementById("outputsection")
    var div = document.createElement('div');
    for (var i = 0; i < row; i +=1) {
        tableString += "<tr>";
        for (var j = 0; j < col; j+=1) {
            var color = "white";
            if(inputMat[i][j]===2){
                color = "#00b0f0"
            }
            tableString += `<td style="background:${color}"></td>`;
        }
        tableString += "</tr>";
    }
    tableString += `</table>`;
    div.innerHTML = tableString;
    body.innerHTML = ``;
    body.innerHTML +=  `<p>Output : ${ans} Units</p>`
    body.appendChild(div);
}
function inputTable(input,row, col,inputMat){
    var displayinput = "["+input.join(",")+"]" 
    var tableString = `<table id="table">`;
    var body = document.getElementById("giveninput")
    var div = document.createElement('div');
    for (var i = 0; i < row; i +=1) {
        tableString += "<tr>";
        for (var j = 0; j < col; j+=1) {
            var color = "white";
            if(inputMat[i][j]===1){
                color = "#ffff00"
            }
            if(inputMat[i][j]===2){
                color = "#00b0f0"
            }
            tableString += `<td style="background:${color}"></td>`;
        }
        tableString += "</tr>";
    }
    tableString += `</table>`;
    div.innerHTML = tableString;
    body.innerHTML = ``;
    body.innerHTML +=  `<p>Input : ${displayinput}</p>`
    body.appendChild(div);
}