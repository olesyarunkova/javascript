let argumentsFromConsole = process.argv;

function findOccurrencesBruteForce(S, T) { // Brute Force
    let n = S.length;
    let m = T.length;
    let positions = [];

    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (S[i + j] !== T[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            positions.push(i + 1); // ���������� � 1
        }
    }

    return positions;
}

function findOccurrencesWithHash(S, T) {    // ����
    let n = S.length;
    let m = T.length;

    let targetHash = 0;
    for (let i = 0; i < m; i++) {
        targetHash += T.charCodeAt(i);  // ����� ����� �������� � ������ T
    }

    let currentHash = 0;
    for (let i = 0; i < m; i++) {
        currentHash += S.charCodeAt(i);  // ����� ����� �������� ��� ������� ���������
    }

    let positions = [];

    for (let i = 0; i <= n - m; i++) {
        if (currentHash === targetHash) {
            let match = true;
            for (let j = 0; j < m; j++) {
                if (S[i + j] !== T[j]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                positions.push(i + 1);  // ������� � �������� � 1
            }
        }

        if (i < n - m) {
            currentHash -= S.charCodeAt(i);
            currentHash += S.charCodeAt(i + m);
        }
    }

    return positions;
}

// ������ �������������
let S1 = "abcabdecab";
let T1 = "cab";
console.log("Stroka 1:")
console.log("BruteForce: ", findOccurrencesBruteForce(S1, T1));
console.log("Hashes: ", findOccurrencesWithHash(S1, T1));

let S2 = "abababacaba";
let T2 = "aba";
console.log("Stroka 2:")
console.log("BruteForce: ", findOccurrencesBruteForce(S2, T2));
console.log("Hashes: ", findOccurrencesWithHash(S2, T2));



/*
cd desktop
cd js
cd hashes+bruteforce
node hashes+bruteforce.js
*/