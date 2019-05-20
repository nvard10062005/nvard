class heroe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0; //բազմացման գործակից
        this.directions = [];

    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var found1 = this.getDirections(0)

        var cord = random(found1)

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }

    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var found1 = this.getDirections(4)
        var found2 = this.getDirections(2)
        var found3 = this.getDirections(1)
        var cord = random(found1.concat(found2,found3))
        // if (this.multiply == 10) {
        //     this.mul()
        //     this.multiply = 0;
        // }
        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            let c = matrix[y][x];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;
            if (c == 4) {
                for (var i in EaterArr) {
                    if (x == EaterArr[i].x && y == EaterArr[i].y) {
                        EaterArr.splice(i, 1);
                    }
                }
            }
            else if (c == 2) {
                for (var i in eatArr) {
                    if (x == eatArr[i].x && y == eatArr[i].y) {
                        eatArr.splice(i, 1);
                    }
                }
            }
            else if (c == 1) {
                for (var i in xotArr) {
                    if (x == xotArr[i].x && y == xotArr[i].y) {
                        xotArr.splice(i, 1);


                        //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
                        //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr

                        //եթե պատրաստ է բազմացմանը, բազմանում է 


                    }
                }
            }
        }
            else {
                //եթե չկա հարմար սնունդ 
                this.move();
                this.energy -=5;
                if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
 
                    this.die();
                }

            }
        
    }



    //mul() բազմանալ
    mul() {
        if (this.multiply == 8) 
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);
       
    

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norheroe = new heroe(x, y);
            heroeArr.push(norheroe);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 5;
            // this.multiply = 0; //????????
        }

    }


    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in heroeArr) {
            //   if (this.energy <=0 )
            
            if (this.x == heroeArr[i].x && this.y == heroeArr[i].y) {
                heroeArr.splice(i, 1);
            }

        }
    }
}