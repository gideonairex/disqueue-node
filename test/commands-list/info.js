'use strict';

var Disqueue = require( '../../' );

describe( '"INFO"', function () {
	describe( 'successful get info', function () {
		var disqueue;
		var data;

		before( function ( done ) {
			disqueue = new Disqueue();
			disqueue.on( 'connected', function () {
				done();
			} );
		} );

		before( function ( done ) {
			disqueue.info( {}, function ( disqueueError, result ) {
				data = result;
				done();
			} );
		} );

		it( 'should return info object', function () {
			/*
			 * server properties
			 *
			 */
			data.should.have.property( 'server' );
			data.server.should.have.property( 'disque_version' );
			data.server.should.have.property( 'disque_git_sha1' );
			data.server.should.have.property( 'disque_git_dirty' );
			data.server.should.have.property( 'disque_build_id' );
			data.server.should.have.property( 'os' );
			data.server.should.have.property( 'arch_bits' );
			data.server.should.have.property( 'multiplexing_api' );
			data.server.should.have.property( 'gcc_version' );
			data.server.should.have.property( 'process_id' );
			data.server.should.have.property( 'run_id' );
			data.server.should.have.property( 'tcp_port' );
			data.server.should.have.property( 'uptime_in_seconds' );
			data.server.should.have.property( 'uptime_in_days' );
			data.server.should.have.property( 'hz' );
			data.server.should.have.property( 'executable' );
			data.server.should.have.property( 'config_file' );

			/*
			 * clients properties
			 *
			 */
			data.should.have.property( 'clients' );
			data.clients.should.have.property( 'connected_clients' );
			data.clients.should.have.property( 'client_longest_output_list' );
			data.clients.should.have.property( 'client_biggest_input_buf' );
			data.clients.should.have.property( 'blocked_clients' );

			/*
			 * memory properties
			 *
			 */
			data.should.have.property( 'memory' );
			data.memory.should.have.property( 'used_memory' );
			data.memory.should.have.property( 'used_memory_human' );
			data.memory.should.have.property( 'used_memory_rss' );
			data.memory.should.have.property( 'used_memory_peak' );
			data.memory.should.have.property( 'used_memory_peak_human' );
			data.memory.should.have.property( 'mem_fragmentation_ratio' );
			data.memory.should.have.property( 'mem_allocator' );

			/*
			 * jobs properties
			 *
			 */
			data.should.have.property( 'jobs' );
			data.jobs.should.have.property( 'registered_jobs' );

			/*
			 * queues properties
			 *
			 */
			data.should.have.property( 'queues' );
			data.queues.should.have.property( 'registered_queues' );

			/*
			 * persistence properties
			 *
			 */
			data.should.have.property( 'persistence' );
			data.persistence.should.have.property( 'loading' );
			data.persistence.should.have.property( 'aof_enabled' );
			data.persistence.should.have.property( 'aof_state' );
			data.persistence.should.have.property( 'aof_rewrite_in_progress' );
			data.persistence.should.have.property( 'aof_rewrite_scheduled' );
			data.persistence.should.have.property( 'aof_last_rewrite_time_sec' );
			data.persistence.should.have.property( 'aof_current_rewrite_time_sec' );
			data.persistence.should.have.property( 'aof_last_bgrewrite_status' );
			data.persistence.should.have.property( 'aof_last_write_status' );

			/*
			 * stats
			 *
			 */
			data.should.have.property( 'stats' );
			data.stats.should.have.property( 'total_connections_received' );
			data.stats.should.have.property( 'total_commands_processed' );
			data.stats.should.have.property( 'instantaneous_ops_per_sec' );
			data.stats.should.have.property( 'total_net_input_bytes' );
			data.stats.should.have.property( 'total_net_output_bytes' );
			data.stats.should.have.property( 'instantaneous_input_kbps' );
			data.stats.should.have.property( 'instantaneous_output_kbps' );
			data.stats.should.have.property( 'rejected_connections' );
			data.stats.should.have.property( 'latest_fork_usec' );

			/*
			 * cpu
			 *
			 */
			data.should.have.property( 'cpu' );
			data.cpu.should.have.property( 'used_cpu_sys' );
			data.cpu.should.have.property( 'used_cpu_user' );
			data.cpu.should.have.property( 'used_cpu_sys_children' );
		} );
	} );
} );
