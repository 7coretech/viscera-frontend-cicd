export function extractParams(referenceURL, actualURL) {
    const refParts = referenceURL.split('/');
    const actParts = actualURL.split('/');

    const params = {};
    refParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.slice(1);
            params[paramName] = actParts[index];
        }
    });

    return params;
}

export function replaceParams(referenceURL, actualURL, newClinicId, newDoctorId) {
    const refParts = referenceURL.split('/');
    const actParts = actualURL.split('/');

    refParts.forEach((part, index) => {
        if (part === ':clinicId') {
            actParts[index] = newClinicId;
        } else if (part === ':doctorId') {
            actParts[index] = newDoctorId;
        }
    });

    return actParts.join('/');
}