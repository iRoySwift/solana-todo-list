import React from "react";

interface Props {
    loading: boolean;
    children: React.ReactNode;
}
const Loading: React.FC<Props> = ({ loading, children }) => {
    if (loading) {
        return <div>Loading...</div>;
    }
    return <>{children}</>;
};
export default Loading;
