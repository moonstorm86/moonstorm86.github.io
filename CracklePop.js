const CracklePop = () => {
    for (let index = 1; index <= 100; index++) {
        if (index % 3 == 0 && index % 5 == 0) {
            console.log("CracklePop");
        } else if (index % 3 == 0) {
            console.log("Crackle");
        } else if (index % 5 == 0) {
            console.log("Pop");
        } else {
            console.log(index);
        }
    }
}

CracklePop()