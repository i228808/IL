import React from "react"

const DeliveryVan = ({
    size = "24",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attributes}
        >
            <path
                d="M19 17H8M8 17H5C3.89543 17 3 16.1046 3 15V6C3 4.89543 3.89543 4 5 4H16C17.1046 4 18 4.89543 18 6V11.2361C18 11.7664 18.2107 12.2751 18.5858 12.6502L20.3498 14.4142C20.7249 14.7893 20.9355 15.298 20.9355 15.8284C20.9355 16.0353 20.9859 16.2392 21.0827 16.4239M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17C4 15.8954 4.89543 15 6 15C7.10457 15 8 15.8954 8 17ZM19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default DeliveryVan
