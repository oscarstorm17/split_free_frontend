export default function Loading() {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}></div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },

    spinner: {
        width: "50px",
        height: "50px",
        border: "5px solid #ddd",
        borderTop: "5px solid #4f46e5",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
    }
};