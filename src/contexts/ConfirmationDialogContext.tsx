import React, { FC } from "react"; 
import ConfirmationDialog, { ConfirmationOptions }  from "../components/dialog/ConfirmationDialog";
import { ReactNode } from "react";

const ConfirmationServiceContext = React.createContext<
  (options: ConfirmationOptions) => Promise<void>
>(Promise.reject);

interface ConfirmationProps {
  // any props that come into the component
  children?: ReactNode;
}

/**
 *
 */
export const useConfirmation = () =>
  React.useContext(ConfirmationServiceContext);

/**
 *
 * @param param0
 */
export const ConfirmationServiceProvider: FC<ConfirmationProps> = ({
  children,
}) => {
  const [
    confirmationState,
    setConfirmationState,
  ] = React.useState<ConfirmationOptions | null>(null);

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  /**
   *
   * @param options
   */
  const openConfirmation = (options: ConfirmationOptions) => {
    setConfirmationState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  /**
   *
   */
  const handleClose = () => {
    if (confirmationState!.catchOnCancel && awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }

    setConfirmationState(null);
  };

  /**
   *
   */
  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationServiceContext.Provider
        value={openConfirmation}
        children={children}
      />

      <ConfirmationDialog
        open={Boolean(confirmationState)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...confirmationState}
      />
    </>
  );
};
