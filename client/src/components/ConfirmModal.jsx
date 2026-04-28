function ConfirmModal({
    show,
    title,
    message,
    onConfirm,
    onCancel,
    isLoading,
}) {
    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1040 }}
                onClick={onCancel}
            />
            {/* Dialog */}
            <div
                className="modal fade show d-block"
                style={{ zIndex: 1050 }}
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onCancel}
                            />
                        </div>
                        <div className="modal-body">{message}</div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={onConfirm}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmModal;
