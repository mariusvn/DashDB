
export default interface SocietyData {
    name: string,
    firebaseAccess: {
        apiKey: string,
        authDomain: string,
        databaseURL: string,
        projectId: string,
        storageBucket: string,
        messagingSenderId: string,
        appId: string,
        measurementId: string
    },
    admins: string[];
}
