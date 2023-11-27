import React from "react";

function useMounted() {
    const [hasMounted, setHasMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}
export default useMounted;
