export default interface CommandRunner<A> {
	run(args: A): Promise<void>;
}
